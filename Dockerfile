FROM node:25-alpine3.22
LABEL application="adameds-frontend"
WORKDIR /adameds-frontend
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5520/tcp
CMD ["npm" , "run", "preview"]