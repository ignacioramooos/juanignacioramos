import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";

const articlePath = "/blog/space-camp-un-ano";
const articleUrl = `https://juanignacioramos.com${articlePath}`;
const publishedAt = "2026-06-02";

const images = [
  {
    src: "/articles/space-camp-anniversary/01-saturn-v-hall.jpg",
    alt: "Saturn V Hall at the Davidson Center for Space Exploration",
  },
  {
    src: "/articles/space-camp-anniversary/02-shuttle.jpg",
    alt: "Space Shuttle exhibit at the U.S. Space & Rocket Center",
  },
  {
    src: "/articles/space-camp-anniversary/03-rocketdyne-f1.jpg",
    alt: "Rocketdyne F-1 engine exhibit",
  },
  {
    src: "/articles/space-camp-anniversary/04-saturnv.jpg",
    alt: "Saturn V rocket exhibit",
  },
  {
    src: "/articles/space-camp-anniversary/05-yo-de-chico.jpg",
    alt: "Juan Ignacio Ramos as a child",
  },
];

const paragraphs = [
  "Hoy, hace un año, estaba terminando de cumplir un sueño.",
  "Mirando hacia atrás, quizás no era un sueño imposible, pero la sensación de finalmente estar allí, después de haberlo intentado 3 veces en 5 años, fue insuperable.",
  "Tengo solo 18 años, pero puedo decir, con mucho orgullo, que uno de mis sueños ya lo cumplí.",
  "Me enteré del Advanced Space Academy con tan solo 11 años, gracias a mi amiga Valentina Oundjian, que también participó del programa. Desde el momento en que la vi cumplir lo que también era su sueño, supe que yo quería lo mismo.",
  "Se sentía lejísimos… pero al mismo tiempo, posible.",
  "Con muy pocos conocimientos (acababa de entrar al liceo), decidí igualmente presentarme con proyectos en inglés. Decir que aprendí mucho en el camino sería quedarme corto. Aprendí, y de formas que hoy todavía me sorprenden, valores fundamentales que siguen en mi “caja de herramientas”: confiar en mí mismo, creer en mis capacidades, el amor propio… y también el valor del método científico.",
  "Todo eso nació de algo simple: iterar, equivocarme, mejorar y volver a intentarlo al año siguiente.",
  "Seguí ese camino hasta que, en 2024, minutos antes de dar el Oral de francés del BAC, recibí la noticia que tanto esperaba: me habían otorgado la beca para el Advanced Space Academy en Huntsville, Alabama.",
  "Llamé a mis padres, emocionado, y empecé a coordinar todo. Hace aproximadamente un año… estaba ahí.",
  "Al llegar, conocí gente increíble. Siendo de Uruguay, un país chico y con prácticamente nula industria aeroespacial, encontrar a alguien con esta misma pasión no es algo de todos los días. Pero ahí, de repente, estaba rodeado de personas que compartían lo mismo que yo.",
  "Me sentí desafiado. Aprendí muchísimo. Y formé vínculos que me llevo para siempre.",
  "Recuerdo entrar al Davidson Center for Space Exploration, más específicamente al Saturn V Hall, y ver el cohete que llevó al ser humano a la Luna.",
  "Y sí, me emocioné.",
  "Probablemente lo más nerd que me pasó en la vida, emocionarme con un cohete.",
  "Pero sabía que no era solo por el cohete. Ni siquiera por el quizás no tan impresionante proyecto que me había llevado hasta ahí.",
  "Era por mi “yo” más chico. Ese Ignacito que soñaba con estar exactamente en ese lugar. El que imprimía imágenes del Rocketdyne F-1 en la impresora del liceo (y que después descubrió que esas fotos habían sido tomadas desde el mismo lugar donde él estaba parado). El que no se rindió hasta lograrlo.",
  "Por eso me permití sentirlo.",
  "Volví de esa experiencia no solo con un diploma, sino con nuevos amigos, recuerdos imborrables y nuevas herramientas para esa caja que llevo conmigo a cada proyecto.",
  "Estoy profundamente agradecido por esta oportunidad.",
  "Y me emociona ver que, así como Valentina hizo conmigo hace algunos años cuando la perseguía por los pasillos haciéndole mil preguntas, hoy hay jóvenes que me hablan a mí con esa misma curiosidad.",
  "Siempre voy a estar ahí para ayudar.",
  "Para que ese bien que un día me dieron, siga circulando.",
  "Porque, si tuviera que resumirlo, creo que ese es mi objetivo: acercar mi pasión a otros, impulsar lo aeroespacial y enseñar.",
  "Acercarnos, entre todos, a un futuro mejor.",
  "Gracias por esta experiencia.",
];

const SpaceCampAnniversaryPage = () => {
  const description = paragraphs.slice(0, 3).join(" ");
  const absoluteImages = images.map((image) => `https://juanignacioramos.com${image.src}`);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Hoy, hace un año, estaba terminando de cumplir un sueño — Juan Ignacio Ramos"
        description={description}
        path={articlePath}
        type="article"
        keywords="Juan Ignacio Ramos, Advanced Space Academy, Space Camp, U.S. Space and Rocket Center, aerospace engineering Uruguay, Saturn V Hall, Rocketdyne F-1"
        image={absoluteImages[0]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Hoy, hace un año, estaba terminando de cumplir un sueño",
          description,
          datePublished: publishedAt,
          dateModified: publishedAt,
          image: absoluteImages,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
          author: {
            "@type": "Person",
            name: "Juan Ignacio Ramos",
            url: "https://juanignacioramos.com",
          },
          about: [
            "Advanced Space Academy",
            "U.S. Space & Rocket Center",
            "Aerospace engineering",
            "Space Camp",
          ],
        }}
      />
      <Navbar />
      <div className="pt-24 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <header className="mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">Space Camp</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Hoy, hace un año, estaba terminando de cumplir un sueño.
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} />
              June 2, 2026
            </div>
          </header>

          <figure className="mb-10 overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="h-[420px] w-full object-cover object-center"
              loading="eager"
            />
          </figure>

          <div className="grid grid-cols-2 gap-3 mb-12">
            {images.slice(1).map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-lg border border-border bg-card">
                <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </figure>
            ))}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
};

export default SpaceCampAnniversaryPage;
