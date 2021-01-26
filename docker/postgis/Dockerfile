FROM postgres:13

RUN apt update \
      && apt install -y wget \
      gnupg2 \
      lsb-release \
      && wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
      && echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list \
      && apt update \
      && apt install -y --no-install-recommends \
      postgresql-13-postgis-3 \
      postgresql-13-postgis-3-scripts

ADD initdb-postgis.sh /
COPY initdb-postgis.sh /docker-entrypoint-initdb.d/postgis.sh
ADD stores.csv /
