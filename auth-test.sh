#!/bin/bash

echo "🔐 Testing GraphQL Auth API..."

# login
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "mutation { login(loginData: { username: \"shihab\", password: \"123456\" }) { access } }"}'

echo ""
echo "✅ Logged in."

# reset password
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "mutation { restPassword(email: \"shihab@example.com\") }"}'

echo ""
echo "✅ Reset password link generated."
