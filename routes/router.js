const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - Email
 *         - Password
 *       properties:
 *         FirstName:
 *           type: String
 *           description: First Name of User
 *         LastName:
 *           type: String
 *           description: Last Name of User
 *         Email:
 *           type: String
 *           description: User Email
 *         Password:
 *           type: password
 *           descripton: User Password
 *       example:
 *         FirstName: John
 *         LastName: Doe
 *         Email: jondoe@gmail.com
 *         Password: secret
 *     Authentication:
 *       type: object
 *       required:
 *         - Email
 *         - Password
 *       properties:
 *         Email:
 *           type: String
 *           description: User Email
 *         Password:
 *           type: password
 *           descripton: User Password
 *       example:
 *         Email: jondoe@gmail.com
 *         Password: secret
 */
/**
 * @swagger
 *  tags:
 *    name: CRUD
 *    description: CRUD operations of Users
 */
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new User
 *     tags: [CRUD]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/register', userCtrl.register);

/**
 * @swagger
 * /user/allusers:
 *   get:
 *     summary: Returns all Users in the Database
 *     tags: [CRUD]
 *     responses:
 *       200:
 *         description: The list of all the Users in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/allusers", userCtrl.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a User's information
 *     tags: [CRUD]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of post
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User Information by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: post can not be found
 */
router.get('/:id', userCtrl.getById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Updates a User's information based on the id
 *     tags: [CRUD]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The User's information was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
router.put('/:id', userCtrl.updateById);

/**
 * @swagger
 *  /user/{id}:
 *    delete:
 *      summary: removes a User from the database
 *      tags: [CRUD]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: User id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The User was successfully deleted
 *        404:
 *          description: The post was not found
 *
 */

router.delete("/:id", userCtrl.deleteById);


/**
 * @swagger
 *  tags:
 *    name: User Authentication
 *    description: Authenticates Registered Users
 */
/**
 * @swagger
 * /user/authenticate:
 *   post:
 *     summary: Authenticates a Registered User
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication'
 *     responses:
 *       200:
 *         description: User Authentication Successfull and Token Generated
 *       500:
 *         description: Some server error
 */
router.post('/authenticate', userCtrl.authenticate);

module.exports = router;