# Klonnit

A full-stack Reddit clone built with [Angular, Node.js, Mysql].

## Features

- 🔐 User authentication and authorization
- 📝 Create, edit, and delete articles, communities
- 💬 Comment on posts
- ⬆️⬇️ Upvote and downvote system
- 👤 User profiles
- 🔍 Search functionality
- 📱 Responsive design

## Tech Stack

**Frontend:**
- Angular

**Backend:**
- Node.js
- Express
- [Mysql]

**DevOps:**
- Docker
- Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/wuk11/Klonnit---a-fullstack-reddit-clone-app
```

2. Run with Docker Compose
```bash
docker-compose up
```

3. Access the application
- Frontend: http://localhost:4200
- API: http://localhost:3000

## Environment Variables
- already setup in docker-compose.yml

```
MYSQL_ROOT_PASSWORD: admin
MYSQL_DATABASE: myapp_db
MYSQL_PASSWORD: admin

DB_HOST: db
DB_USER: root
DB_PASSWORD: admin
DB_NAME: myapp_db
DB_PORT: "3306"
SECRET: "qwertasdfg"
```

## Project Structure

```
Klonnit/
├── redditCloneAPI-main/                  # Backend API
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── redditCloneAPP-main/                  # Angular frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```
## API endpoints

- Auth
```
POST /auth/signup
POST /auth/login
```

- Comment
```
GET /comment/:id                         # return comments from an article
POST /comment/:id                        # post a comment to an article
POST /comment/reply/:id                  # post a reply to a comment
POST /comment/upvote/:id                 # upvote comment
POST /comment/downvote/:id               # downvote comment
DELETE /comment/:id                      # delete comment
```

- Community
```
POST /community/                         # post a community
POST /community/ban/:id                  # ban a user from a community
POST /community/unban/:id                # unban a user from a community
POST /commnuity/:id/article              # post an article to a community
POST /community/article/:id/upvote       # upvote an article
POST /community/article/:id/downvote     # downvote an article
GET /community/                          # return communities
GET /community/candelete/:id             # check to see if a user can delete a community
GET /community/canedit/:id               # check to see if a user can edit a community
GET /community/:id/articles              # return articles from a community
GET /community/articles/:id              # return a specific article
GET /community/randomarticles            # return 10 random articles
PATCH /community/changeRules/:id         # change rules of a community
PATCH /community/articles/edittags/:id   # change tags of an article
DELETE /community/:id                    # delete a communtiy
DELETE /community/article/:id            # delete an article
```

- Reports
```
POST /reports/comment/:id                # report a comment
POST /reports/article/:id                # report an article
```

- User
```
GET /user/me                             # return the currently logged in user
GET /user/:id/karma                      # return karma of the specific user
GET /user/:id                            # return specific user
PATCH /user/changepassword/              # change user password
PATCH /user/changeusername/              # change username
PATCH /user/changedisplayname/           # change user display name
PATCH /user/changedescription/           # change user description
PATCH /user/changeimage/                 # change user image
```

## Contact

Vukasin - vukasin.abv@gmail.com

## Acknowledgments

- Inspired by Reddit
