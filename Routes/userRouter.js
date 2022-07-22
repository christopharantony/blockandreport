const router = require('express').Router();
const User = require('../Model/userModel');

router.post('/block',async (req, res) => {
    const { userId, blockedby } = req.query;
    console.log('userId',userId,'blockedby', blockedby);
    const user =await User.findOne({userId:userId});
    if (user) {
        if (user.blockedBy?.includes(blockedby)) {
            const index = user.blockedBy.indexOf(blockedby);
            user.blockedBy.splice(index, 1);
            await user.save();
            res.json({ blocked: false, user });
        } else {
            console.log(user.blockedBy,'kkkkkkk');
            if (user.blockedBy) {
            user.blockedBy.push(blockedby);
            await user.save();
            res.json({ blocked: true, user });
            } else {
                user.blockedBy = [blockedby];
                await user.save();
                res.json({ blocked: true, user });
            }
        }
    } else {
        const user = new User({
            userId: userId,
            blockedBy: [blockedby]
        });
        await user.save();
        res.json({ blocked: true, user });

    } 
});

router.get('/block', (req, res) => {
    console.log('get all users');
    User.find({}, (err, users) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(users);
        }
    }
    ).sort({ name: 1 });
});



module.exports = router;
