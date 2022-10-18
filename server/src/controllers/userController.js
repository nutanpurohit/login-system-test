const bcrypt = require('bcryptjs')
const db = require('../db')
const jwt = require('jsonwebtoken')

const passRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/
const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/

// path - /users/register
// method - POST
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const query = 'INSERT INTO user_tb(`email`, `password`) VALUES (?)'
        const existingUserQuery =
            'SELECT * FROM user_tb WHERE email = ? LIMIT 1'
        if (!email.match(emailRegex)) {
            return res.status(400).send({
                message: 'Please enter valid email address',
            })
        }
        if (!password.match(passRegex)) {
            return res.status(400).send({
                message: 'Please enter valid password',
            })
        }

        const passwordHash = await bcrypt.hash(req.body.password, 8)
        const values = [req.body.email, passwordHash]

        db.query(existingUserQuery, email, async (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Internal Server Error',
                })
            }
            if (data?.length > 0) {
                return res.status(400).send({
                    message: 'Email already exists',
                })
            } else {
                db.query(query, [values], (err) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'Internal Server Error',
                        })
                    }
                    return res.status(201).send({
                        message: 'User registered successfully',
                    })
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            message: 'Bad Request',
        })
    }
}

// path - /users/login
// method - POST
const loginUser = async (req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password

        const query = 'SELECT * FROM user_tb WHERE email = ? LIMIT 1'
        db.query(query, email, async (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: 'Internal Server Error',
                })
            }
            if (data?.length < 1) {
                return res.status(400).send({
                    message: 'Email not registered',
                })
            }
            const isPasswordCorrect = await bcrypt.compare(
                password,
                data[0].password
            )
            const token = jwt.sign(
                { email: data[0].email },
                process.env.JWT_SECRET || 'secret'
            )
            if (isPasswordCorrect) {
                return res.json({ user: data[0], token })
            }
            return res.status(400).send({
                message: 'Please enter valid email and password',
            })
        })
    } catch (error) {
        res.status(400).send({
            message: 'Bad Request',
        })
    }
}

module.exports = {
    createUser,
    loginUser,
}
