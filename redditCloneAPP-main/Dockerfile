FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy all your Angular code
COPY . .

# Expose port 4200
EXPOSE 4200

# Run ng serve with proper host binding
CMD ["ng", "serve", "--host", "0.0.0.0"]