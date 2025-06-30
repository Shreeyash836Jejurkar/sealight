export const secretPatterns: { name: string, regex: RegExp }[] = [
    {
      name: "AWS Access Key",
      regex: /AKIA[0-9A-Z]{16}/g
    },
    {
      name: "Generic API Key",
      regex: /api[_-]?key['"]?\s*[:=]\s*['"][a-z0-9]{32,45}['"]/gi
    },
    {
      name: "JWT Token",
      regex: /eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/g
    },
    {
      name: "Base64 String",
      regex: /(?:[A-Za-z0-9+/]{4}){4,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?/g
    }
  ];