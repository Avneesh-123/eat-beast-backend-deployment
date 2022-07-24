const stripe = require("stripe");
const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const bookingModel = require("../Model/bookingModel");
// const stripeObj = stripe('sk_test_51I57ncLVmgB2cGGS5x64WhstuzdE0UXen7ABgWR8PEQ6gcDGNiChirgGnRhHM3kSYUU5tWkszGDk400XHV7EsOeG00liOmSM3Y');
const stripeObj = require('stripe')('sk_test_51KpmFLSFT8hV0zXKzV1t4uLR0AenHbFF3RcDcsJhuiuNwys1jcj8uOXDFxX7w93glDAx4czASd8A8zRpH024vdx700UiwTq7C6')//private key

async function createPaymentSession(req , res){
    try{
        const userId = req.id;
        const {planId} = req.body;
        const plan = await planModel.findById(planId);
        const user = await userModel.findById(userId);
        console.log(plan,user)
        // session object isko nhi chedna !!!
        const session = await stripeObj.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: plan.name,
                  },
                  unit_amount: plan.price*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://eat-beast-herk.herokuapp.com',
            cancel_url: 'https://eat-beast-herk.herokuapp.com',
        })
        res.json({
            session
        })
    }
    catch(error){
        res.json({
            message:"Failed to create payment session",
            error
        })
    }
}

async function createNewBooking(userEmail, planId) {
  
}

async function checkoutComplete(req,res){
  console.log("Checkout complete ran!!");
  console.log("Request object");
  console.log(req);


}

module.exports.createPaymentSession = createPaymentSession;
module.exports.checkoutComplete = checkoutComplete;