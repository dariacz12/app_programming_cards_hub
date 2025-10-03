# how to start register.yaml test :

export TEST_NAME=User$(LC_ALL=C tr -dc a-z </dev/urandom | head -c 8)
export TEST_EMAIL=test$(date +%s)@mail.com
export TEST_PASSWORD=Pass$(date +%s)!
maestro test ./maestro/register.yaml --env TEST_NAME="$TEST_NAME" --env TEST_EMAIL="$TEST_EMAIL" --env TEST_PASSWORD="$TEST_PASSWORD"
