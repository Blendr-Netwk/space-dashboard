export const downloadFile = (blob: any, fileName: string) => {
  const link = document.createElement("a")
  link.href = window.URL.createObjectURL(blob)
  link.download = `${fileName}.pem`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
