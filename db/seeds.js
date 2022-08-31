const sequelize = require("../config/connection");
const { faker } = require('@faker-js/faker');
const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// create functions for seeding

async function seedUsers(number = 12) {
    // store users as an array
    const createdUsers = [];
    // seed user
    for (let index = 0; index < number; index++) {

        const createUser = await User.create({
            email: faker.internet.email(),
            name: faker.name.fullName(),
            password: "abcd1234"
        });
        // push to array
        createdUsers.push(createUser);
    }
    // give array to next function
    return createdUsers;
}


// seed blog

async function seedBlogs(userPools, number = 12) {
    // store blogs as an array
    const createdBlogs = [];
    // seed blog
    for (let index = 0; index < number; index++) {

        const createBlog = await Blog.create({
            user_id: faker.helpers.arrayElement(userPools).id,
            title: faker.animal.cat(),
            content: faker.lorem.paragraph()
        })
        // push to array
        createdBlogs.push(createBlog);
    }
    // give array to next function
    return createdBlogs;
}


// seed comments

async function seedComments(userPools, blogPools, number = 12) {
    // store comments as an array
    const createdComments = [];
    // seed comment
    for (let index = 0; index < number; index++) {

        const createComment = await Comment.create({
            user_id: faker.helpers.arrayElement(userPools).id,
            blog_id: faker.helpers.arrayElement(blogPools).id,
            content: faker.lorem.paragraph()
        })
        // push to array
        createdComments.push(createComment);
    }
    // give array to next function
    return createdComments;
}

// seed
async function seed() {

    const users = await seedUsers();

    const blogs = await seedBlogs(users);

    const comments = await seedComments(users, blogs);
}

// run seed
sequelize.sync({ force: true })
    .then(seed)
    .then(() => process.exit(0));