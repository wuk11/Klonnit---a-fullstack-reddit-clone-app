from faker import Faker
import mysql.connector
from datetime import datetime
import random
import json

fake = Faker()

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="reddit_clone"
)

cursor = db.cursor()

createdAt = datetime.now()
updatedAt = datetime.now()

def generateUsers():
    users = []
    for i in range(100000):
        email = fake.email() + str(i) + fake.safe_hex_color()
        username = fake.first_name() + str(i) + fake.safe_hex_color()
        displayName = fake.user_name() + str(i) + fake.safe_hex_color()
        password = "test123"
        description = fake.paragraph(nb_sentences=1)
        image = "https://placehold.co/256x256/" + fake.safe_hex_color()[1:] + "/" + fake.safe_hex_color()[1:]

        users.append((email, username, displayName, password, description, image, createdAt, updatedAt))
        if len(users) >= 10000:
            cursor.executemany(
                """
                INSERT INTO users (email, username, displayName, password, description, image, createdAt, updatedAt)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                users
            )

            db.commit()
            users.clear()

            print(f"Inserted {i + 1} users")
            usersGenerated += i + 1

    if users:
        cursor.executemany(
            """
            INSERT INTO users (email, username, displayName, password, description, image, createdAt, updatedAt)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            users
        )
        db.commit()

    cursor.close()
    db.close()
    usersGenerated += len(users)

def generateCommunities():
    communities = []
    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    for i in range(10000):
        name = fake.company() + " - " + fake.catch_phrase()
        description = fake.paragraph(nb_sentences=3)
        rules = fake.paragraph(nb_sentences=1)
        UserId = random.choice(user_ids)
        communities.append((name, description, rules, createdAt, updatedAt, UserId))
        if len(communities) >= 10000:
            cursor.executemany(
                    """
                    INSERT INTO communities (name, description, rules, createdAt, updatedAt, UserId)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    communities
                )

            db.commit()
            communities.clear()

            print(f"Inserted {i + 1} communities")
    if communities:
        cursor.executemany(
                """
                INSERT INTO communities (name, description, rules, createdAt, updatedAt, UserId)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                communities
            )

        db.commit()
        communities.clear()

def generateArticles():
    articles = []
    cursor.execute("SELECT id FROM communities")
    community_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    for i in range(100000):
        title = fake.catch_phrase()
        text = fake.paragraph(nb_sentences=2)
        karma = 0
        image = "https://placehold.co/512x512/" + fake.safe_hex_color()[1:] + "/" + fake.safe_hex_color()[1:]
        tags = json.dumps(fake.words(nb=3))
        CommunityID = random.choice(community_ids)
        UserID = random.choice(user_ids)
        articles.append((title, text, karma, image, tags, createdAt, updatedAt, CommunityID, UserID))
        if len(articles) >= 10000:
            cursor.executemany(
                """
                INSERT INTO articles (title, text, karma, image, tags, createdAt, updatedAt, CommunityID, UserID)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                articles
            )
            db.commit()
            articles.clear()

            print(f"inserted {i + 1} articles")
    if articles:
            cursor.executemany(
                """
                INSERT INTO articles (title, text, karma, image, tags, createdAt, updatedAt, CommunityID, UserID)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                articles
            )
            db.commit()
            articles.clear()


def generateComments():
    comments = []
    cursor.execute("SELECT id FROM articles")
    article_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    for i in range(150000):
        text = fake.paragraph(nb_sentences=1)
        karma = 0
        ArticleId = random.choice(article_ids)
        UserId = random.choice(user_ids)
        replyToCommentId = None
        comments.append((text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId))
        if len(comments) >= 10000:
            cursor.executemany(
                """
                INSERT INTO comments (text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                comments
            )
            db.commit()
            comments.clear()

            print(f"inserted {i + 1} comments")
    if comments:
        cursor.executemany(
            """
            INSERT INTO comments (text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            comments
        )
        db.commit()
        comments.clear()

def generateReplies():
    comments = []

    cursor.execute("SELECT id, ArticleId FROM comments")
    comments_data = cursor.fetchall()

    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    for i in range(500000):
        text = fake.paragraph(nb_sentences=1)
        karma = 0
        UserId = random.choice(user_ids)
        replyToCommentId, ArticleId = random.choice(comments_data)
        comments.append((text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId))
        if len(comments) >= 10000:
            cursor.executemany(
                """
                INSERT INTO comments (text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                comments
            )
            db.commit()
            comments.clear()

            print(f"inserted {i + 1} replies")
    if comments:
        cursor.executemany(
            """
            INSERT INTO comments (text, karma, createdAt, updatedAt, ArticleId, UserId, replyToCommentId)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            comments
        )
        db.commit()
        comments.clear()

generateUsers()
generateCommunities()
generateArticles()
generateComments()
generateReplies()