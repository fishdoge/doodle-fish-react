# ton bot


# docker file
- docker pull gcr.io/hongwang-gcp/telegram-bot:latest


# gcp cloud run

gcloud run deploy telegram-bot \
  --image gcr.io/hongwang-gcp/telegram-bot:latest \
  --platform managed \
  --region us-central1 \
  --min-instances 0 \
  --cpu 1 \
  --memory 512Mi \
  --allow-unauthenticated
  --no-cpu-throttling


  docker tag telegram-bot gcr.io/hongwang-gcp/telegram-bot
