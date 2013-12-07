<?xml version="1.0"?>

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:w="http://web.meon.eu/"
    exclude-result-prefixes="w"
>

<xsl:import href="lib/html-page.xsl" />
<xsl:import href="lib/menu.xsl" />
<xsl:import href="lib/question.xsl" />

<xsl:output
    method="html"
    indent="yes"
    omit-xml-declaration="yes"
    doctype-system="about:legacy-compat"
/>

<xsl:template match="/w:page">
    <xsl:apply-templates select="w:content/xhtml:*"/>
</xsl:template>

<xsl:template name="page-header">
</xsl:template>

<xsl:template name="page-footer">
    <!-- Piwik -->
    <script type="text/javascript">
    var pkBaseURL = (("https:" == document.location.protocol) ? "https://stats.meon.eu/" : "http://stats.meon.eu/");
    document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
    </script><script type="text/javascript">
    try {
    var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 19);
    piwikTracker.trackPageView();
    piwikTracker.enableLinkTracking();
    } catch( err ) {}
    </script><noscript><p><img src="http://stats.meon.eu/piwik.php?idsite=19&amp;rec=1" style="border:0" alt="" /></p></noscript>
    <!-- End Piwik Tracking Code -->
</xsl:template>

<xsl:template name="extra-headers">
</xsl:template>

</xsl:stylesheet>
