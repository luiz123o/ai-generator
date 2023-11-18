import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { ModeToggle } from "./components/mode-toggle/mode-toggle";
import { ThemeProvider } from "./components/theme.provider";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import { Textarea } from "./components/ui/textarea";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload video</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido por Luiz no NLW
            </span>
            <Separator orientation="vertical" className="h-6" />
            <Button variant={"outline"}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <ModeToggle />
          </div>
        </div>
        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para IA"
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Lembre-se você pode utilizar a variável{" "}
              <code className="text-orange-400">{"{transcription}"}</code> no
              seu prompt para adicionar o conteúdo do vídeo selecionado.
            </p>
          </div>
          <aside className="w-80 space-y-6 ">
            <form className="space-y-6">
              <label
                htmlFor="video"
                className="hover:bg-yellow-50/20 text-muted-foreground border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center"
              >
                <FileVideo />
                Selecione o video
              </label>
              <input
                type="file"
                className="sr-only"
                id="video"
                accept="video/mp4"
              />
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="transcription-prompt">
                  Prompt de transcrição
                </Label>
                <Textarea
                  className="h-20 leading-relaxed resize-none"
                  id="transcription_prompt"
                  placeholder="Inclua palavras-chave mencionadas no vídeo separado por (,), para ajudar a IA a transcrever o conteúdo."
                />
              </div>
              <Button type="submit" className="w-full">
                Carregar video
                <Upload className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <Separator />

            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Prompt</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um prompt..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Título YouTube</SelectItem>
                    <SelectItem value="description">
                      Descrição YouTube
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">
                  Você poderá customizar esta opção em breve
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Temperatura</Label>
                <Slider min={0} max={1} step={0.1} />
                <span className="block text-xs text-muted-foreground italic leading-relaxed">
                  Valores mais altos geram resultados mais criativos, mas menos
                  coerentes.
                </span>
              </div>
              <Separator />
              <Button type="submit" className="w-full">
                Executar <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  );
}
