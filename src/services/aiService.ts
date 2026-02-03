import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

// Define a type for the prediction result
export interface PredictionResult {
    className: string;
    probability: number;
    isPest: boolean;
}

// Keywords to identify potential pests in MobileNet classes
const PEST_KEYWORDS = [
    "insect", "bug", "worm", "beetle", "fly", "aphid",
    "weevil", "mite", "caterpillar", "slug", "snail",
    "ant", "grasshopper", "cricket", "locust", "spider"
];

let model: mobilenet.MobileNet | null = null;

/**
 * Loads the MobileNet model. Caches the model instance for subsequent calls.
 */
export const loadModel = async (): Promise<mobilenet.MobileNet> => {
    if (model) {
        return model;
    }
    await tf.ready();
    console.log("Loading MobileNet model...");
    model = await mobilenet.load();
    console.log("MobileNet model loaded.");
    return model;
};

/**
 * Classifies an image and determines if it contains a pest.
 * @param imageElement HTMLImageElement to classify
 * @returns Promise<PredictionResult> The top prediction with pest detection flag.
 */
export const detectPest = async (imageElement: HTMLImageElement): Promise<PredictionResult> => {
    const loadedModel = await loadModel();

    // Classify the image
    const predictions = await loadedModel.classify(imageElement);

    if (!predictions || predictions.length === 0) {
        return { className: "Unknown", probability: 0, isPest: false };
    }

    // Check top predictions for pest keywords
    // We look at the top 3 predictions to be safer
    const topPredictions = predictions.slice(0, 3);

    // Find the first prediction that matches a pest keyword
    const pestPrediction = topPredictions.find(p =>
        PEST_KEYWORDS.some(keyword => p.className.toLowerCase().includes(keyword))
    );

    if (pestPrediction) {
        return {
            className: pestPrediction.className,
            probability: pestPrediction.probability,
            isPest: true
        };
    }

    // If no pest found, return the top prediction (likely the plant or generic object)
    // We assume it's healthy if no pest is detected
    return {
        className: predictions[0].className,
        probability: predictions[0].probability,
        isPest: false
    };
};
