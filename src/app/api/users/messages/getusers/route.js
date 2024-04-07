import { getUserMessaging } from "@/app/mongodb/controllers/user.controller";

export async function POST(req, res){
    const {id} = await req.json();
    const users = await getUserMessaging(id);
    
    return Response.json({status: 200, users});
}