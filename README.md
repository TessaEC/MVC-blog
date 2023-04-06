# MVC-blog

## Description

The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Usage 

A CMS-style blog site, where developers can publish their blog posts and comment on other developers’ posts as well. 

## User Story

AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions


## Acceptance Criteria

GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

## Visuals

Displays homepage

![image](https://user-images.githubusercontent.com/118077000/230463813-09b8c7f8-958f-45cb-b977-184142d1fab0.png)

Tabs for login and signup

![image](https://user-images.githubusercontent.com/118077000/230463903-9759452a-6ca8-4a3f-bdac-f0c43cb850d8.png)

![image](https://user-images.githubusercontent.com/118077000/230463955-92c9c79b-e7c0-4ff7-b97e-da20927e2d19.png)

After login - view dashboard page with logged in user blogs and ability to add a new blog and view your blog to update

![image](https://user-images.githubusercontent.com/118077000/230464074-0a9697c8-c056-40ff-a9d9-c1447e66ee8e.png)

Updating ability

![image](https://user-images.githubusercontent.com/118077000/230464582-ca64c2f5-a04f-4976-b5ff-c4b267b84f48.png)

Viewing a single blog post from home page 

![image](https://user-images.githubusercontent.com/118077000/230464726-0928b067-d717-416e-bb0e-31c12f0f624d.png)

Module 14 - weekly challenge

GitHub repo URL:
https://github.com/TessaEC/MVC-blog

Heroku URL:
https://techblog-challenge14.herokuapp.com/

