# DOCUMENTATION

## Setup instructions

### Assumptions

- Docker is installed in your computer

### Setup steps

- For running this application you need to clone the repo and run below commands

```
cd backend
docker build -t fastapi-sku-app .
docker run -d -p 8000:8000 fastapi-sku-app
```

- run `docker ps` to check that server is up and running on port 8000
- This will start a localhost server running on port 8000

## API Documentation

- This application uses GraphQL so for easily checking all the apis and the request response params you can go to http://localhost:8000/graphql. This will open graphql playground where apis can be tested as well

### APIs

- get all skus - This is to fetch all skus and optionally takes
  - request body :-
    - search term :- term to be search,
    - sort key :- column that needs to be sorted and
    - sort order :- order of the column ( asc or desc )
  - response
    - contentScore :- score of the content
    - id :- id of the sku
    - name :- name of the sku
    - returnPercent :- return percent of the sku
    - notes (list)
      - content :- content of the note
      - createdAt :- when was the note created
      - userRole :- role of the user
  ```
  query MyQuery {
      skus(search: "", sortKey: "", sortOrder: "") {
          contentScore
          id
          name
          returnPercent
          sales
          notes {
              content
              createdAt
              userRole
          }
      }
  }
  ```
- get single sku by id :-
  - This api returns single sku by id
    - request
      - id :- id of the sku to be fetched
    - response
    - contentScore :- score of the content
    - id :- id of the sku
    - name :- name of the sku
    - returnPercent :- return percent of the sku
    - notes (list)
      - content :- content of the note
      - createdAt :- when was the note created
      - userRole :- role of the user
    ```
    query MyQuery {
        skuById(skuId: "") {
            contentScore
            id
            name
            returnPercent
            sales
            notes {
                content
                createdAt
                userRole
            }
        }
    }
    ```
- add note :-
  - API to add a new note
    - request
      - newNote :- to tell backend if its creating a new note or updating an existing one
      - skuId :- id of the sku
      - content :- content of the note
      - userRole :- user role "brand_user" or "merch_admin"
    - response
      - id :- id of the sku where the note got added
    ```
    mutation AddNote($newNote: Boolean!, skuId: String!, $content: String!, $userRole: String!) {
        addNote(newNote: $newNote, skuId: $skuId, content: $content, userRole: $userRole) {
            id
        }
    }
    ```
