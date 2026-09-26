// here waa wax walba oo validation u baahan
// (schema)waa schema-ha aan validate gareeneno, hadii la aqbali waayo waa celineenaa hadii la aqbalo neh next ayan isticmaalaynaa

import { object, success } from "zod";

export const validate = (schema)=> (req, res, next)=> {
    // shcema-ha ayan checking ku samayneena,oo requiretment-giisa inaa hubino ayan rabnaa
    const result = schema.safeParse(req.body);
    console.log("result", result)
    // waxan fiirinayna schema-ha laso paasay iyo body-ga ma is leeyihiin, haday ok noqon waayo error-ka soo baxay ayan formate-garayneena
    if(!result.success) {
        const formatted = result.error.format();
        console.log("formatted", formatted)
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            // buradaki "keys"=waa name,email,password kuwan qaab array ahaan ayuu uso celinaa, kadib ku dul wareeg field ka qaadanaynaa oo ayku jiraan errors,name,email,password.
            errors: Object.keys(formatted).map(field => ({
                // kadib field-ga markaas la marooyo so qabo wuxunu naqon karaa= errors,email,name,password
                field,
                message: formatted[field]?._errors?.[0] || 'Invalid input'
            }))
        })
    }
    next();
}