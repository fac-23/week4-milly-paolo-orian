# Petarazzi
FAC team project for server-side-app week!   
[Live site](https://petarazzi.herokuapp.com/) 🔗

## Install guide
- Clone the repo
```
git clone https://github.com/fac-23/week4-milly-paolo-orian.git
```

- Install dependencies
```
npm install
```
### Local database setup 
- Create local db
```
./scripts/create_db <name of your local database>
```
- Populate local db
```
./scripts/populate_db
```
- Run `psql`
- Run `\connect <name of your local database>`
- Run `\dt` to check the tables are there. There should be three tables: users, posts and sessions
- To start sever run `npm run dev`
- For cypress testing run  `npm run test`
- Access locally on localhost:3000

## User stories
- As a user, I want to be able to sign up
- As a user, I want to be able to log in
- As a user, I want to be able to post a photo of my pet
- As a user, I want my username to be displayed near my post
- As a user, I want to be able to post a caption with my pet photo
- As a user, I want to be able to see photos of other user's pets
- As a user, I want to be able to log out

**Stretch**
- As a user, I want to have the option to log in with GitHub
- As a user, I want to be able to delete my post

## Roles

- QA - Paolo
- UX/UI - Milly
- Scrum, DevOps - Orian 
