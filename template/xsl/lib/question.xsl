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

<xsl:template match="w:question">
    <div class="container">

    <div class="alerts">
    <div class="alert alert-danger alert-dismissable false-answer">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <strong>Falsch!</strong> Versuche es noch einmal.
    </div>
    <div class="alert alert-success alert-dismissable good-answer">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <strong>Richtig!</strong>
    </div>
    </div>
    <div id="timer"/>
    <div id="score"/>
    <h1 class="question-title"><xsl:value-of select="./@title"/></h1>

    <form class="question">
    <div id="question-el"></div>
    </form>

    </div><!-- container -->
</xsl:template>

</xsl:stylesheet>
