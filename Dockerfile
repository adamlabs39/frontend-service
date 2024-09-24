FROM node:19.5.0-alpine
LABEL application="adameds-frontend"
WORKDIR /adameds-frontend
COPY . .
RUN npm install
EXPOSE 5520/tcp
CMD ["npm" , "run", "preview"]