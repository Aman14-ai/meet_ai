import z from "zod";

export const agentInsertSchema = z.object({
    name:z.string().min(1,{message:"Name is required"}),
    instruction:z.string().min(1,{message:"Instruction is required"})   
})

export const agentUpdateSchema = agentInsertSchema.extend({
    id: z.string().min(1,{message:"Id is required"}),
})