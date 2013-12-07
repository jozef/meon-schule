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
</xsl:template>

<xsl:template name="extra-headers">
</xsl:template>

</xsl:stylesheet>
