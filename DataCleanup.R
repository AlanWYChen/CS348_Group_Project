

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
```

## R Markdown


Information about the dataset:

title_a: (probably not necessary 95% sure)
- unique ident
- ordering?
- title
- region
- language

title_b:(will be using)
- key - important
- titleTpye - important
- primaryTitle - important
- OriginalTitle - maybe
- isAdult - yes
- Start year - yes
- runtime - sure
- genres - maybe

title_c: (n_const is how you get information about the person?)
- ident
- directors
- writers

title_e not important

title_p:
- have to look into this

name_b:
- primary name
- birth year
- death year
- primary profession
- known fors?






```{r cars}
# 
name_b <- read.csv('name.basics.tsv', sep='\t')
title_b <- read.csv('title.basics.tsv', sep='\t')
title_c <- read.csv('title.crew.tsv', sep='\t')
title_e <- read.csv('title.episode.tsv', sep='\t')
title_p <- read.csv('title.principals.tsv', sep='\t')
title_r <- read.csv('title.ratings.tsv', sep='\t')
movies <- read.csv('movies.csv')
```

```{r}
nrow(movies)
title_b <- title_b[title_b$titleType=='movie', ]
# Performing a left join
result <- merge(title_b, movies, by.x="primaryTitle", by.y = "title")

```

```{r}

nrow(result)
View(head(result))

```
```{r}
# which(duplicated(result$primaryTitle))

# Same size dfs now to reduce the other dfs to these by taking 
unique_rows <- result[which(!duplicated(result$primaryTitle)), ]
columns_of_interest <- c('tconst', 'primaryTitle', 'isAdult', 'rel_date', 'startYear', 'genres')
names(unique_rows)
final_movies <- unique_rows[columns_of_interest]
final_movies <- final_movies %>%
  mutate(across(everything(), ~ replace(.x, .x == "\\N", NA)))
new_id <- seq(1:nrow(final_movies))
final_movies$id = new_id

```

```{r}

final_c <- merge(final_movies, title_c, by="tconst")
final_p <- merge(final_movies, title_p, by="tconst")
final_r <- merge(final_movies, title_r, by="tconst")
final_b <- merge(final_p, name_b, by="nconst")
```

```{r}
final_c <- final_c[c('id', 'tconst', 'directors', 'writers')]
final_p <- final_p[c('id', 'tconst', 'nconst', 'category')]
final_r <- final_r[c('id', 'tconst', 'averageRating', 'numVotes')]
final_b <- final_b[c('nconst', 'primaryName', 'knownForTitles')]
library(dplyr)
library(tidyr)
```

```{r}

b <- distinct(final_b)
p <- distinct(final_p)

c <- final_c %>%
  mutate(across(everything(), ~ replace(.x, .x == "\\N", NA)))
p <- p %>%
  mutate(across(everything(), ~ replace(.x, .x == "\\N", NA)))
r <- final_r %>%
  mutate(across(everything(), ~ replace(.x, .x == "\\N", NA)))
b <- b %>%
  mutate(across(everything(), ~ replace(.x, .x == "\\N", NA)))


```

Create the sample
```{r}

sample_movies <- final_movies[grepl("iron man", final_movies$primaryTitle, ignore.case = TRUE), ]
sample_c <- merge(sample_movies, c, by="id")
sample_p <- merge(sample_movies, p, by="id")
sample_r <- merge(sample_movies, r, by="id")
sample_b <- merge(sample_p, b, by="nconst")

```


```{r}
nrow(sample_movies)
nrow(sample_c)
nrow(sample_p)
nrow(sample_r)
nrow(sample_b)
```

```{r}

genres <- final_movies %>%
  separate_rows(genres, sep = ",")

movie_genres <- genres[c('id', 'genres')]

directors <- c %>%
  separate_rows(directors, sep = ",")

movie_director <- directors[c('id', 'directors')]

writers <- c %>%
  separate_rows(writers, sep = ",")

movie_writers <- writers[c('id', 'writers')]


known <- b %>%
  separate_rows(knownForTitles, sep = ",")

movie_knownFor <- known[c('nconst', 'knownForTitles')]
movie_knowns <- merge(final_movies, movie_knownFor, by.x='tconst', by.y="knownForTitles")
movie_knownForTitle <- movie_knowns[c('id', 'nconst')]

```
```{r}
View(b)

```


Output Final
```{r}

write.csv(final_movies, "movies.csv", row.names = FALSE)
write.csv(b, "names.csv", row.names = FALSE)
write.csv(p, "principal.csv", row.names = FALSE)
write.csv(r, "ratings.csv", row.names = FALSE)
write.csv(c, "crew.csv", row.names = FALSE)
write.csv(movie_genres, "genres.csv", row.names=FALSE)
write.csv(movie_director, "director.csv", row.names=FALSE)
write.csv(movie_writers, "writers.csv", row.names=FALSE)
write.csv(movie_knownForTitle, "knownFor.csv", row.names=FALSE)

```

Sample Data

```{r}

s_genres <- sample_movies %>%
  separate_rows(genres, sep = ",")

sample_genres <- s_genres[c('id', 'genres')]

s_directors <- sample_c %>%
  separate_rows(directors, sep = ",")

sample_director <- s_directors[c('id', 'directors')]

s_writers <- sample_c %>%
  separate_rows(writers, sep = ",")

sample_writers <- s_writers[c('id', 'writers')]


s_known <- sample_b %>%
  separate_rows(knownForTitles, sep = ",")

s_knownFor <- s_known[c('nconst', 'knownForTitles')]
s_knowns <- merge(final_movies, s_knownFor, by.x='tconst', by.y="knownForTitles")
sample_knownForTitle <- s_knowns[c('id', 'nconst')]

```


```{r}
write.csv(sample_movies, "sample_movies.csv", row.names = FALSE)
write.csv(sample_b, "sample_names.csv", row.names = FALSE)
write.csv(sample_p, "sample_principal.csv", row.names = FALSE)
write.csv(sample_r, "sample_ratings.csv", row.names = FALSE)
write.csv(sample_c, "sample_crew.csv", row.names = FALSE)
write.csv(sample_genres, "sample_genres.csv", row.names=FALSE)
write.csv(sample_director, "sample_director.csv", row.names=FALSE)
write.csv(sample_writers, "sample_writers.csv", row.names=FALSE)
write.csv(sample_knownForTitle, "sample_knownFor.csv", row.names=FALSE)
View(sample_movies)
```

```{r}
View(sample_movies)
```






