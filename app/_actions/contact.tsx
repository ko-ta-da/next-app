"use server";

function validateEmail(email: string) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

export async function createContactData(
    _state: { status: string; message: string },
    formData: FormData
  ): Promise<{ status: "success" | "error"; message: string }> {
    const rawFormData = {
      lastname: formData.get("lastname") as string,
      firstname: formData.get("firstname") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };
  
    if (!rawFormData.lastname) {
      return {
        status: "error",
        message: "姓を入力してください",
      };
    }
    if (!rawFormData.firstname) {
      return {
        status: "error",
        message: "名を入力してください",
      };
    }
    if (!rawFormData.company) {
      return {
        status: "error",
        message: "会社名を入力してください",
      };
    }
    if (!rawFormData.email || !validateEmail(rawFormData.email)) {
      return {
        status: "error",
        message: "メールアドレスの形式が正しくありません",
      };
    }
    if (!rawFormData.message) {
      return {
        status: "error",
        message: "お問い合わせ内容を入力してください",
      };
    }
    const result = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            {
              objectTypeId: "0-1",
              name: "lastname",
              value: rawFormData.lastname,
            },
            {
              objectTypeId: "0-1",
              name: "firstname",
              value: rawFormData.firstname,
            },
            {
              objectTypeId: "0-1",
              name: "company",
              value: rawFormData.company,
            },
            {
              objectTypeId: "0-1",
              name: "email",
              value: rawFormData.email,
            },
            {
              objectTypeId: "0-1",
              name: "message",
              value: rawFormData.message,
            },
          ],
        }),
      }
    );
  
    try {
      await result.json();
    } catch (e) {
      console.log(e);
      return {
        status: "error",
        message: "お問い合わせに失敗しました",
      };
    }
    return {
      status: "success",
      message: "お問い合わせを受け付けました",
    };
  }