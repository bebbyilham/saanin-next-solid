"use server";

export async function fetchBudgetAction(year: number) {
  try {
    const response = await fetch(`https://admin-dashboard.sumbarprov.go.id/api/simbangda/getlistrealisasibelanjaopd/${year}`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      return { success: false, error: "Source API returned error Status " + response.status };
    }
    
    const json = await response.json();
    return { success: true, data: json };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch" };
  }
}
