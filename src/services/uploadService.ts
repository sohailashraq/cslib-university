import { supabase } from "../supabase/client";

export const UploadService = {
  // آپلود PDF
  async uploadPDF(file: File, bookId: string): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${bookId}.${fileExt}`;

    const { error } = await supabase.storage
      .from("books")
      .upload(`pdfs/${fileName}`, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("books").getPublicUrl(`pdfs/${fileName}`);

    return publicUrl;
  },

  // حذف PDF از Supabase
  async deletePDF(pdfUrl: string): Promise<boolean> {
    try {
      // استخراج نام فایل از URL
      const fileName = pdfUrl.split("/pdfs/")[1];
      if (!fileName) return false;

      const { error } = await supabase.storage
        .from("books")
        .remove([`pdfs/${fileName}`]);

      if (error) {
        console.error("خطا در حذف از Supabase:", error);
        return false;
      }

      console.log("✅ فایل از Supabase حذف شد:", fileName);
      return true;
    } catch (error) {
      console.error("خطا در deletePDF:", error);
      return false;
    }
  },
};
