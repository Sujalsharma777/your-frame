document.getElementById("download-btn").addEventListener("click", function () {
  let container = document.getElementById("imageSec");

  html2canvas(container, { useCORS: true })
    .then((canvas) => {
      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "collage.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Error capturing the collage:", error);
    });
});

interact("#image-container")
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    autoScroll: true,
    listeners: {
      move(event) {
        let target = event.target;
        let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    },
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move(event) {
        let { target, rect } = event;
        let x = parseFloat(target.getAttribute("data-x")) || 0;
        let y = parseFloat(target.getAttribute("data-y")) || 0;

        target.style.width = rect.width + "px";
        target.style.height = rect.height + "px";

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    },
  });
