FROM python:3.8-alpine

ENV PYTHONBUFFERED 1
RUN apk update
RUN apk add --no-chache --virtual pytyhon3.8-dev gcc musl-dev build-base postgresql-dev
RUN mkdir /app
WORKDIR /app
COPY service/Pipfile /app/
RUN pip install pipenv
RUN pipenv install
COPY service/ /app/