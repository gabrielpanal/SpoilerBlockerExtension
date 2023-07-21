import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score

import pandas as pd
import pickle

csv_file_path = "reviews.csv"

reviewText = 'review_text'
isSpoiler = 'is_spoiler'

data_frame = pd.read_csv(csv_file_path)
sample = data_frame.sample(n=200, random_state=42)

reviewText_data = sample[reviewText]
isSpoiler_data = sample[isSpoiler]

reviewText_array = reviewText_data.values
isSpoiler_array = isSpoiler_data.values

vectorizer = CountVectorizer()
vectorizer.fit(reviewText_array)
reviewText_array = vectorizer.transform(reviewText_array)

X_train, X_test, y_train, y_test = train_test_split(reviewText_array, isSpoiler_array, test_size=0.2, random_state=42)

classifier = MultinomialNB()
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
fscore = f1_score(y_test, y_pred)
accuracy = accuracy_score(y_test, y_pred)

print("Precision:", precision)
print("Recall:", recall)
print("F1-Score:", fscore)
print("Accuracy:", accuracy)

with open('model.pkl', 'wb') as f:
    pickle.dump(classifier, f)

# def predict(contents):
#     model = joblib.load('model.pkl')

#     X = vectorizer.transform(contents)
#     probability = model.predict_proba(X)
#     output = 'Spoiler'
#     if(model.predict(X)):
#         output = 'Not Spoiler'
#     return output,probability