sonar-scanner \
  -Dsonar.projectKey=email-summarizer \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=$SONAR_TOKEN
