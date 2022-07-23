const router = require('express').Router();
const User = require('../Model/userModel');

router.post('/block', async (req, res) => {
    const { userId, blockedby } = req.query;
    const user = await User.findOne({ userId: userId });
    if (user) {
        if (user.blockedBy?.includes(blockedby)) {
            const index = user.blockedBy.indexOf(blockedby);
            user.blockedBy.splice(index, 1);
            await user.save();
            res.json({ blocked: false, user });
        } else {
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
    User.find({}, (err, users) => {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(users);
        }
    }
    ).sort({ userId: 1 });
});

router.post('/report', async (req, res) => {
    const reasons = [
        "Harrasment and cyberbullying",
        "Privacy",
        "Impersonation of me or someone else",
        "Violent threats",
        "Child endangerment",
        "Hate speech against a protected group",
        "Spam and scams"
    ]
    console.log(req.query)
    const { userId, reportedby } = req.query;
    let { reason } = req.query;
    reason = parseInt(reason);
    if (reason < 8 ) {
        if ( reason >= 1 ) {
        const user = await User.findOne({ userId: userId });
        const reportObj = {
            reportedby: reportedby,
            reason: reasons[reason - 1]
        }
        if (user) {
            if (user.reports?.includes(reportObj)) {
                const index = user.reports.indexOf(reportObj);
                user.reports.splice(index, 1);
                await user.save();
                res.json({ reported: false, user });
            } else {
                if (user.reports) {
                    user.reports.push(reportObj);
                    await user.save();
                    res.json({ reported: true, user });
                } else {
                    user.reports = [reportObj];
                    await user.save();
                    res.json({ reported: true, user });
                }
            }
        } else {
            const user = new User({
                userId: userId,
                reports: reportObj
            });
            await user.save();
            res.json({ reported: true, user });
        }
    } else {
        res.json({ reported: false, message: "Invalid reason" });
    }} else {
        res.json({ reported: false, message: "Invalid reason" });
    }
})

module.exports = router;
