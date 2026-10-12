# Small helper for drawing simple, fixed-position causal diagrams (DAGs)
# with Graphviz, via Quarto's native `{dot}` support (see
# https://quarto.org/docs/authoring/diagrams.html#graphviz).
#
# Diagrams use the `neato` layout engine with pinned ("!") coordinates,
# so a node placed at the same (x, y) in two different diagrams always
# ends up at the exact same pixel position, even if the rest of the
# diagram differs. This is what lets us keep (for example) the same
# "Storks -> Birth rate" edge visually identical across a "spurious
# relation" diagram and a "confounding" diagram that adds a third node.
#
# Usage (from an `#| output: asis` R chunk):
#
#   cat(dag_diagram(
#     nodes = list(
#       X = dag_node("Storks", x = 0, y = 0),
#       Y = dag_node("Birth rate", x = 3, y = 0)
#     ),
#     edges = list(
#       dag_edge("X", "Y", label = "\u03b2 = 0.62**")
#     )
#   ))

# A single node: a short id (used to connect edges), a display label,
# and fixed x/y coordinates (in inches). `highlight = TRUE` fills the
# node with an accent color instead of the default light blue, useful
# for tracing out a specific path through a tree or DAG.
dag_node <- function(label, x, y, highlight = FALSE) {
    list(label = label, x = x, y = y, highlight = highlight)
}

# A single directed edge between two node ids (matching the names used
# in the `nodes` list passed to dag_diagram()), with an optional label.
# `dashed = TRUE` draws a grey dashed line instead of a solid black one,
# useful for showing a relationship that is weakened, removed, or no
# longer holds (e.g. an edge "explained away" by a confounder).
# `highlight = TRUE` draws a bold, accent-colored line instead, useful
# for tracing out a specific path through a tree or DAG.
dag_edge <- function(from, to, label = NULL, dashed = FALSE, highlight = FALSE) {
    list(from = from, to = to, label = label, dashed = dashed, highlight = highlight)
}

# Builds a complete "```{dot} ... ```" fenced block as a plain string.
# `nodes` is a named list of dag_node(), `edges` is a list of dag_edge().
# `fig_width`/`fig_height` (inches) should roughly match the diagram's
# aspect ratio, so Quarto doesn't pad the figure with a lot of empty
# space to fill a default-sized canvas.
dag_diagram <- function(nodes, edges, fig_width = 3.6, fig_height = 1.2) {
    node_lines <- vapply(names(nodes), function(id) {
        n <- nodes[[id]]
        attrs <- sprintf('label="%s", pos="%s,%s!"', n$label, n$x, n$y)
        if (isTRUE(n$highlight)) {
            attrs <- paste0(attrs, ', fillcolor="#2c5aa0", fontcolor="white"')
        }
        sprintf('  %s [%s]', id, attrs)
    }, character(1))

    edge_lines <- vapply(edges, function(e) {
        attrs <- character(0)
        if (!is.null(e$label) && e$label != "") {
            attrs <- c(attrs, sprintf('label="%s"', e$label))
        }
        if (isTRUE(e$dashed)) {
            attrs <- c(attrs, 'style="dashed"', 'color="grey60"', 'fontcolor="grey40"')
        }
        if (isTRUE(e$highlight)) {
            attrs <- c(attrs, 'color="#2c5aa0"', 'penwidth=2.2')
        }
        if (length(attrs) == 0) {
            sprintf('  %s -> %s', e$from, e$to)
        } else {
            sprintf('  %s -> %s [%s]', e$from, e$to, paste(attrs, collapse = ", "))
        }
    }, character(1))

    sprintf(
        paste0(
            '```{dot}\n',
            '//| fig-width: %s\n',
            '//| fig-height: %s\n',
            'digraph {\n',
            '  layout=neato\n',
            '  node [shape=box, style=filled, fillcolor="#eaf2fb", fontsize=11, fontname="Helvetica", margin="0.12,0.06"]\n',
            '  edge [fontsize=10, fontname="Helvetica"]\n',
            '%s\n',
            '%s\n',
            '}\n',
            '```\n'
        ),
        fig_width, fig_height,
        paste(node_lines, collapse = "\n"),
        paste(edge_lines, collapse = "\n")
    )
}
