# Fraud Detection Model API
## Overview
This project implements a Fraud Detection API designed to detect fraudulent transactions using a combination of rule-based and machine learning models. The API accepts transaction details and predicts the likelihood of fraud, returning a boolean (true or false) alongside a fraud score and the reason for the prediction.

## API Response Format
Each API response will return the following JSON structure:
```bash
{
  "transaction_id": "<string>",
  "is_fraud": <boolean>,
  "fraud_source": "<string: 'rule'/'model'>",
  "fraud_reason": "<string>",
  "fraud_score": <float>
}
```

* **transaction_id:** Unique identifier of the transaction.
* **is_fraud:** Boolean flag indicating whether the transaction is fraudulent or not.
* **fraud_source:** Indicates whether the fraud detection was triggered by a rule-based method or the machine learning model.
* **fraud_reason:** Describes the reason for fraud detection.
* **fraud_score:** A float value between 0 and 1 indicating the confidence level of fraud prediction.

# Approach
## 1. Data Preprocessing
* **Input Fields:** The input will include various fields such as `transaction_id`, `transaction_date`, `transaction_amount`, `transaction_channel`, `payer_card_brand`, and more.

* **Handling Categorical Data:** Convert categorical data (e.g., `transaction_channel`, `payer_card_brand`, etc.) to numerical values using one-hot encoding or label encoding.

* **Scaling Numerical Data:**
For fields such as `transaction_amount`, apply normalization techniques like Min-Max scaling to standardize input values for the model.

## 2. Rule-Based Fraud Detection
Before sending the input to the machine learning model, a set of predefined business rules will be applied to identify common fraud patterns, such as:

* Unusually high transaction amounts.
* Suspicious transaction times (e.g., late-night transactions).
* Uncommon payment channels.

If a transaction meets any of these predefined conditions, the `fraud_source` will be set to `"rule"`, and the reason will be stored in `fraud_reason`.

## 3. Machine Learning Model
If no rules are triggered, the transaction will be sent to the machine learning model for fraud prediction:

### **Model Architecture:** 
The model is a Neural Network with multiple layers designed for binary classification (fraud or not fraud).

* **Input Layer:** Takes in the preprocessed features (numerical/categorical).
* **Hidden Layers:** Contains fully connected layers with ReLU activation functions.
* **Output Layer:** A single neuron with a sigmoid activation to output the probability of the transaction being fraudulent.
### **Training the Model:**
* The model is trained on past transaction data with labeled outcomes (fraud/not fraud).
* Use Binary Cross-Entropy Loss for training.
* Adam Optimizer is used to optimize the model.
### **Fraud Score:** 
* The output of the sigmoid function will be interpreted as the `fraud score` (fraud_score). If the score exceeds a predefined threshold (e.g., 0.5), the transaction will be marked as fraudulent.


## 4. API Design
The API is built to handle both real-time and batch processing:

* POST /fraud-detection/real-time: Takes a single transaction as input and returns the fraud prediction.

* POST /fraud-detection/batch: Accepts multiple transactions in a batch and returns fraud predictions for each transaction.