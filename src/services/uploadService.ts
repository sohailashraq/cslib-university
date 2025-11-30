import { supabase } from "../supabase/client";

export const UploadService = {
  async uploadPDF(file: File, bookId: string): Promise<string> {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${bookId}.${fileExt}`;

      console.log("آپلود فایل:", fileName); // برای دیباگ

      const { error } = await supabase.storage
        .from("books")
        .upload(`pdfs/${fileName}`, file);

      if (error) {
        console.error("خطا در آپلود:", error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("books").getPublicUrl(`pdfs/${fileName}`);

      console.log("لینک عمومی:", publicUrl); // برای دیباگ
      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("آپلود فایل انجام نشد");
    }
  },
};
