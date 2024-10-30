# ai_model.py
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
import joblib

class TaskDataset(Dataset):
    def __init__(self, csv_file):
        self.data = pd.read_csv(csv_file)
        self.vectorizer = CountVectorizer()
        self.label_encoder = LabelEncoder()

        self.X = self.vectorizer.fit_transform(self.data['description']).toarray()
        self.y = self.label_encoder.fit_transform(self.data['priority'])

        # Save the vectorizer and label encoder for later use
        joblib.dump(self.vectorizer, 'vectorizer.joblib')
        joblib.dump(self.label_encoder, 'label_encoder.joblib')

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        X = torch.tensor(self.X[idx], dtype=torch.float32)
        y = torch.tensor(self.y[idx], dtype=torch.long)
        return X, y

class TaskPriorityModel(nn.Module):
    def __init__(self, input_size, num_classes):
        super(TaskPriorityModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, num_classes)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

def train_model():
    dataset = TaskDataset('data/dataset.csv')
    dataloader = DataLoader(dataset, batch_size=2, shuffle=True)

    input_size = dataset.X.shape[1]
    num_classes = len(set(dataset.y))

    model = TaskPriorityModel(input_size, num_classes)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    num_epochs = 50
    for epoch in range(num_epochs):
        for X_batch, y_batch in dataloader:
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

    # Save the trained model
    torch.save(model.state_dict(), 'model.pth')

if __name__ == "__main__":
    train_model()
