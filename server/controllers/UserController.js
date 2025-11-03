import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { insertUser, selectUserByEmail } from '../models/User.js'
import { ApiError } from '../helpers/Apierror.js'

const { sign } = jwt

const signUp = async (req, res, next) => {
    const { user } = req.body

    if (!user || !user.email || !user.password) {
        return next(new ApiError('Email and password are required', 400))
    }

    hash(user.password, 10, async (err, hashedPassword) => {
        if (err) return next(err)
        try {
            const result = await insertUser(user.email, hashedPassword)
            res.status(201).json({ id: result.rows[0].id, email: user.email })
        } catch (error) {
            return next(new ApiError('Failed to create user', 500))
        }
    })
}

const signIn = async (req, res, next) => {
    const { user } = req.body

    if (!user || !user.email || !user.password) {
        return next(new ApiError('Email and password are required', 400))
    }

    try {
        const result = await selectUserByEmail(user.email)
        if (result.rows.length === 0) {
            return next(new ApiError('User not found', 404))
        }

        const dbUser = result.rows[0]
        compare(user.password, dbUser.password, (err, isMatch) => {
            if (err) return next(err)

            if (!isMatch) {
                return next(new ApiError('Invalid password', 401))
            }

            const token = sign({ user: dbUser.email }, process.env.JWT_SECRET)
            res.status(200).json({
                id: dbUser.id,
                email: dbUser.email,
                token
            })
        })
    } catch (error) {
        return next(new ApiError('Failed to sign in', 500))
    }
}

export { signUp, signIn }

