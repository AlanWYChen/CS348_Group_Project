# sample input

user_id = bba424e2-e0a1-445b-86bc-f8f2427bd7c4 \
list_id = 24ec6dbb-ba9f-404d-8c8f-375277e0e80f \
movie_id = tt0160127

# sample output (query.sql)
## old table

| user_id  |  list_id | movie_id  |
|---|---|---|
| 0652905f-ac23-4a3c-afc8-0c585d261636 | 8cd2997e-1fb5-4449-b6d0-acdc005c5fa9 | tt1034303 |
| c8a98339-31b6-4bca-baba-1e22f8e80c76 | 2f06153f-0adf-4167-be41-6f19361b2128 | tt1045772 |
| ec4df890-bd40-4cbc-b521-5d60a3326589 | 6cdc90d2-35e2-4948-a47f-d2a2bc6908c8 | tt10638522 |

## After first INSERT

| user_id  |  list_id | movie_id  |
|---|---|---|
| 0652905f-ac23-4a3c-afc8-0c585d261636 | 8cd2997e-1fb5-4449-b6d0-acdc005c5fa9 | tt1034303 |
| c8a98339-31b6-4bca-baba-1e22f8e80c76 | 2f06153f-0adf-4167-be41-6f19361b2128 | tt1045772 |
| ec4df890-bd40-4cbc-b521-5d60a3326589 | 6cdc90d2-35e2-4948-a47f-d2a2bc6908c8 | tt10638522 |
| bba424e2-e0a1-445b-86bc-f8f2427bd7c4 | 24ec6dbb-ba9f-404d-8c8f-375277e0e80f | tt0160127 |

## After second INSERT
| user_id  |  list_id | movie_id  |
|---|---|---|
| 0652905f-ac23-4a3c-afc8-0c585d261636 | 8cd2997e-1fb5-4449-b6d0-acdc005c5fa9 | tt1034303 |
| c8a98339-31b6-4bca-baba-1e22f8e80c76 | 2f06153f-0adf-4167-be41-6f19361b2128 | tt1045772 |
| ec4df890-bd40-4cbc-b521-5d60a3326589 | 6cdc90d2-35e2-4948-a47f-d2a2bc6908c8 | tt10638522 |
| bba424e2-e0a1-445b-86bc-f8f2427bd7c4 | 24ec6dbb-ba9f-404d-8c8f-375277e0e80f | tt0160127 |
| bba424e2-e0a1-445b-86bc-f8f2427bd7c4 |  050f8dae-af02-4e44-b24a-8cc72e1473fe | tt0167260 |

## After DELETE
| user_id  |  list_id | movie_id  |
|---|---|---|
| c8a98339-31b6-4bca-baba-1e22f8e80c76 | 2f06153f-0adf-4167-be41-6f19361b2128 | tt1045772 |
| ec4df890-bd40-4cbc-b521-5d60a3326589 | 6cdc90d2-35e2-4948-a47f-d2a2bc6908c8 | tt10638522 |
| bba424e2-e0a1-445b-86bc-f8f2427bd7c4 | 24ec6dbb-ba9f-404d-8c8f-375277e0e80f | tt0160127 |
| bba424e2-e0a1-445b-86bc-f8f2427bd7c4 |  050f8dae-af02-4e44-b24a-8cc72e1473fe | tt0167260 |
