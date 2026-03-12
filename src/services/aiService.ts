import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';

export interface PredictionResult {
    className: string;
    probability: number;
    isPest: boolean;
    isInvalid?: boolean;
}

let model: mobilenet.MobileNet | null = null;
let isWarmingUp = false;

// Keywords that indicate a physical threat or disease
const PEST_KEYWORDS = [
    'insect', 'bug', 'grasshopper', 'caterpillar', 'beetle', 'weevil',
    'aphid', 'worm', 'slug', 'snail', 'mite', 'locust', 'ant', 'fly',
    'spider', 'moth', 'butterfly', 'wasp', 'bee', 'ladybug'
];

// Keywords indicating healthy plants/leaves to prevent false alarms
const PLANT_KEYWORDS = [
    'plant', 'leaf', 'flower', 'tree', 'crop', 'vegetables', 'fruit', 
    'cabbage', 'lettuce', 'greenhouse', 'pot', 'daisy', 'grass', 'tomato',
    'potato', 'corn', 'wheat', 'rice', 'strawberry', 'apple', 'orange', 
    'lemon', 'banana', 'pepper', 'squash', 'cucumber', 'broccoli', 'cauliflower', 
    'zucchini', 'mushroom', 'vine', 'garden', 'bean', 'pea', 'seed', 'root', 
    'stem', 'pod', 'berry', 'melon', 'agriculture', 'farming', 'produce', 
    'harvest', 'flora', 'potted', 'vase', 'fern', 'shrub', 'bush', 'herb', 
    'weed', 'artichoke', 'fig', 'pineapple', 'pomegranate', 'acorn', 'soybean',
    'eggplant', 'onion', 'garlic', 'carrot', 'radish', 'turnip', 'celery',
    'spinach', 'kale', 'pumpkin', 'gourd', 'grape', 'cherry', 'peach', 'plum',
    'apricot', 'pear', 'nut', 'almond', 'walnut', 'pecan', 'cotton', 'tobacco',
    'sugarcane', 'coffee', 'tea', 'cocoa', 'mango', 'papaya', 'guava', 'avocado',
    'olive', 'coconut', 'mint', 'basil', 'rosemary', 'thyme', 'oregano', 'sage',
    'field', 'pasture', 'meadow', 'botanical', 'petunia', 'rose', 'sunflower',
    'tulip', 'orchid', 'lily', 'iris', 'carnation', 'marigold', 'hibiscus'
];

export const loadModel = async (): Promise<mobilenet.MobileNet> => {
    if (model) return model;

    try {
        await tf.setBackend('webgl');
        await tf.ready();

        console.log("Loading Pre-Migration MobileNet Classifier...");
        model = await mobilenet.load({ version: 2, alpha: 1.0 });
        console.log("Model loaded successfully.");

        return model;
    } catch (error) {
        console.error("Failed to load generic vision model:", error);
        throw error;
    }
};

export const detectPest = async (imageElement: HTMLImageElement): Promise<PredictionResult> => {
    try {
        const loadedModel = await loadModel();

        // Analyze image using MobileNet ImageNet classes
        const predictions = await loadedModel.classify(imageElement, 5);
        predictions.sort((a, b) => b.probability - a.probability);

        console.log("ImageNet Output:", predictions);

        // 1. Check if the model strongly suspects an insect or bug
        const pestPrediction = predictions.find(p =>
            PEST_KEYWORDS.some(k => p.className.toLowerCase().includes(k))
        );

        if (pestPrediction) {
            return {
                className: `Pest Detected: ${pestPrediction.className.split(',')[0]}`,
                probability: pestPrediction.probability,
                isPest: true
            };
        }

        // 2. Check if the model recognizes a general plant/crop
        const plantPrediction = predictions.find(p =>
            PLANT_KEYWORDS.some(k => p.className.toLowerCase().includes(k))
        );

        if (plantPrediction) {
            return {
                className: "Crop seems Healthy",
                probability: plantPrediction.probability,
                isPest: false
            };
        }

        // 3. Unrecognized general object (e.g. human hands, random background, non-crop items)
        return {
            className: "Invalid Image",
            probability: predictions[0].probability,
            isPest: false,
            isInvalid: true
        };

    } catch (error: any) {
        console.error("Error during prediction:", error);
        return {
            className: "Analysis Failed",
            probability: 0.0,
            isPest: false
        };
    }
};
