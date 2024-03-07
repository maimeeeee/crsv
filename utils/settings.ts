export async function fetchAndWriteToFile(url: string, filePath: string) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const settings = json.payload.blob;
    // const rawLines = await blob.text();

    // const jsonData = response.json();
    // // JSONデータをUint8Arrayに変換
    // const jsonString = JSON.stringify(jsonData, null, 2);
    // const encoder = new TextEncoder();
    // const uint8Array = encoder.encode(jsonString);

    Deno.writeTextFileSync(filePath, settings);
    console.log(`File written to ${filePath} successfully!`);
  } catch (error) {
    console.error("Error fetching and writing file:", error);
  }
}
