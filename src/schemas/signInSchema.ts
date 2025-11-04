//:4
import { z } from 'zod'


export const signInSchema = z.object({ 
    identifier: z.string(), //identifier is known as uername
    password: z.string(),
    
})