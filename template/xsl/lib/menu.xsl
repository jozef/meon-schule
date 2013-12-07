<?xml version="1.0"?>

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:w="http://web.meon.eu/"
    exclude-result-prefixes="w"
>

<xsl:output
    method="html"
    indent="yes"
    omit-xml-declaration="yes"
    doctype-system="about:legacy-compat"
/>

<xsl:template match="w:top-menu-a2">
    <!-- Static navbar -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Schule.meon.at</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="/2A/">2A</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Multiplikation <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="2xReien">2x</a></li>
                <li><a href="3xReien">3x</a></li>
                <li><a href="4xReien">4x</a></li>
                <li><a href="5xReien">5x</a></li>
                <li><a href="6xReien">6x</a></li>
                <li><a href="7xReien">7x</a></li>
                <li><a href="8xReien">8x</a></li>
                <li><a href="9xReien">9x</a></li>
                <li><a href="10xReien">10x</a></li>
                <li class="divider"></li>
                <li><a href="xBis100">x bis 100</a></li>
              </ul>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
</xsl:template>

</xsl:stylesheet>
