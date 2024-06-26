import { syntaxTree } from "@codemirror/language";
import {
  Decoration,
  DecorationSet,
  EditorView,
  Range,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@uiw/react-codemirror";

// plugin for displaying the save function button
class LineWidget extends WidgetType {
  toDOM() {
    const wrap = document.createElement("span");
    wrap.classList.add("line-widget");
    wrap.classList.add("absolute");
    wrap.classList.add("top-0");
    wrap.classList.add("end-0");

    return wrap;
  }

  ignoreEvent() {
    return false;
  }
}

function lineWidgets(view: EditorView) {
  const widgets: Range<Decoration>[] = [];
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node) => {
        if (node.name == "def") {
          const deco = Decoration.widget({
            widget: new LineWidget(),
            side: 2,
          });
          widgets.push(deco.range(node.from));
        }
      },
    });
  }
  return Decoration.set(widgets);
}

export const lineWidgetPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = lineWidgets(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged) this.decorations = lineWidgets(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);
// plugin for rendering the first line of the editor
class FirstLineWidget extends WidgetType {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }

  eq(other: FirstLineWidget): boolean {
    return other.name === this.name;
  }

  toDOM() {
    const html = `<span style="color: #999;">def</span> <span style="color: #999;">${this.name}</span>(<span style="color: #999;">ctx</span>: <span style="color: #999;">Context</span>, <span style="color: #999;">pipeline</span>: <span style="color: #999;">Pipeline</span>)-&gt; <span style="color: #999;">bool</span>:`;
    const wrap = document.createElement("span");
    wrap.innerHTML = html;
    return wrap;
  }
}

function firstLineRange(view: EditorView) {
  const firstLineText = view.state.doc.line(1).text;
  const name = firstLineText.split("(")[0].split(" ")[1];
  const decorations = Decoration.set([
    Decoration.replace({
      widget: new FirstLineWidget(name),
      side: 2,
      ignoreSelection: true,
    }).range(0, firstLineText.length),
  ]);

  return decorations;
}

export const firstLinePlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = firstLineRange(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.decorations = firstLineRange(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

// editor themes
// export const myThemeLight = createTheme({
//   theme: "light",
//   settings: {
//     background: "hsl(var(--muted))",
//     backgroundImage: "",
//     foreground: "#4D4D4C",
//     caret: "#AEAFAD",
//     selection: "#D6D6D6",
//     selectionMatch: "#D6D6D6",
//     gutterBackground: "hsl(var(--muted))",
//     gutterForeground: "#4D4D4C",
//     gutterBorder: "#dddddd",
//     gutterActiveForeground: "",
//     lineHighlight: "#EFEFEF",
//   },
//   styles: [
//     { tag: t.comment, color: "#787b80" },
//     { tag: t.name, color: "#00cc99" },
//     { tag: t.definition(t.typeName), color: "#194a7b" },
//     { tag: t.typeName, color: "#194a7b" },
//     { tag: t.standard(t.typeName), color: "#194a7b" },
//     { tag: t.tagName, color: "#008a02" },
//     { tag: t.variableName, color: "#00cc99" },
//     { tag: t.definition(t.variableName), color: "#0400ff" },
//     { tag: t.function(t.variableName), color: "#001eff" },
//     { tag: t.propertyName, color: "#ffa200" },
//     { tag: t.function(t.propertyName), color: "#ffbb00" },
//     { tag: t.definition(t.propertyName), color: "#ff0000" },
//     { tag: t.special(t.propertyName), color: "#ff0000" },
//     { tag: t.attributeName, color: "#ffa200" },
//     { tag: t.className, color: "#ff0000" },
//     { tag: t.namespace, color: "#000000" },
//     { tag: t.string, color: "#ff0000" },
//     { tag: t.special(t.string), color: "#ff0000" },
//     { tag: t.attributeValue, color: "#ff0000" },
//     { tag: t.operatorKeyword, color: "#ffd500" },
//     { tag: t.controlKeyword, color: "#c01b1b" },
//     { tag: t.definitionKeyword, color: "#ff8800" },
//     { tag: t.moduleKeyword, color: "#ff0000" },
//     { tag: t.operator, color: "#000000" },
//   ],
// });

// export const myThemeDark = createTheme({
//   theme: "light",
//   settings: {
//     background: "hsl(var(--muted))",
//     backgroundImage: "",
//     foreground: "hsl(var(--foreground))",
//     caret: "#AEAFAD",
//     selection: "#000",
//     selectionMatch: "#000",
//     gutterBackground: "hsl(var(--muted))",
//     gutterForeground: "#4D4D4C",
//     gutterBorder: "hsl(var(--border))",
//     gutterActiveForeground: "",
//     lineHighlight: "#000",
//   },
//   styles: [
//     { tag: t.comment, color: "#787b80" },
//     { tag: t.name, color: "#00cc99" },
//     { tag: t.definition(t.typeName), color: "#194a7b" },
//     { tag: t.typeName, color: "#194a7b" },
//     { tag: t.standard(t.typeName), color: "#194a7b" },
//     { tag: t.tagName, color: "#008a02" },
//     { tag: t.variableName, color: "#00cc99" },
//     { tag: t.definition(t.variableName), color: "#0400ff" },
//     { tag: t.function(t.variableName), color: "#001eff" },
//     { tag: t.propertyName, color: "#ffa200" },
//     { tag: t.function(t.propertyName), color: "#ffbb00" },
//     { tag: t.definition(t.propertyName), color: "#ff0000" },
//     { tag: t.special(t.propertyName), color: "#ff0000" },
//     { tag: t.attributeName, color: "#ffa200" },
//     { tag: t.className, color: "#ff0000" },
//     { tag: t.namespace, color: "#000000" },
//     { tag: t.string, color: "#ff0000" },
//     { tag: t.special(t.string), color: "#ff0000" },
//     { tag: t.attributeValue, color: "#ff0000" },
//     { tag: t.operatorKeyword, color: "#ffd500" },
//     { tag: t.controlKeyword, color: "#ff0000" },
//     { tag: t.definitionKeyword, color: "#ff8800" },
//     { tag: t.moduleKeyword, color: "#ff0000" },
//     { tag: t.operator, color: "#000000" },
//   ],
// });