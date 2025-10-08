#!/bin/bash

echo "🧪 Testing GraphQL Users API..."

# create user
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "mutation { createUser(createUserData: { name: \"Shihab\", age: 25, email: \"shihab@example.com\", username: \"shihab\", password: \"123456\" }) { message user { userId name email } } }"}'

echo ""
echo "✅ Created user."

# get users
curl -X POST http://localhost:3000/graphql \
-H "Content-Type: application/json" \
-d '{"query": "{ getUsers { userId name email } }"}'

echo ""
echo "✅ Retrieved users."
