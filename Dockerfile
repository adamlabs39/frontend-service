FROM node:25-alpine3.22
LABEL application="adameds-frontend"
WORKDIR /adameds-frontend
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4092"
RUN npm install
RUN npm run build-only
EXPOSE 5520/tcp
CMD ["npm" , "run", "preview"]