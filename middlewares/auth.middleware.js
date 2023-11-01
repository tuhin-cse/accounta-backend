import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

export const decodeToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret)
        next()
    } catch (err) {
        next()
    }
}



export const isUser = (req, res, next) => {
    let {user} = res.locals
    if (!!user?._id) {
        next()
    } else {
        res.status(401).send({
            error: true,
            msg: 'Unauthorized'
        })
    }
}