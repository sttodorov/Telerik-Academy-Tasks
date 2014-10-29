<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="NewsSystem.WebForms._Default" Culture="en-CA" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
        <h1>News System</h1>
        <p class="lead">Wellcome to News System.</p>
        <p><a href="Account/Register" class="btn btn-primary btn-lg">Register Now &raquo;</a></p>
    </div>
    <asp:ObjectDataSource runat="server" ID="ArticlesData"
        TypeName="NewsSystem.WebForms.Services.ArticlesService"
        SelectMethod="GetMostPopular" />
    <div class="panel panel-primary col-lg-6 body-content pull-left" >
        <div class="panel-heading">
            <h3>Most popular Articles</h3>
        </div>
        <div class="panel-body">
            <asp:Repeater runat="server"
                DataSourceID="ArticlesData"
                ID="ArticelsRepeater"
                ItemType="NewsSystem.WebForms.Models.Article">
                <ItemTemplate>
                    <asp:HyperLink NavigateUrl='<%# "~/ArticleDetails?articleId=" + Item.Id %>' runat="server" Font-Size="Large" Text="<%#: Item.Title  %>" />
                    <asp:Literal Text="<%#: Item.Category.Name %>" runat="server" />
                    <br />
                    <p>
                        <%#: Item.Content.Length<300?Item.Content:Item.Content.Substring(0,300).Insert(300,"...") %>
                    </p>
                    <p>
                        Likes: <%#: Item.Vote %>
                    </p>
                    <p>
                        by <%#: Item.User.UserName %> created on: <%#: Item.DateCreated %>
                    </p>
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </div>
    
    <asp:ObjectDataSource runat="server" ID="CategoriesData"
        TypeName="NewsSystem.WebForms.Services.CategoryService"
        SelectMethod="GetAll" />

    <div class="panel panel-primary col-lg-5 body-content pull-right">
        <div class="panel-heading">
            <h3>All Categories</h3>
        </div>
        <div class="panel-body">
            <asp:Repeater runat="server"
                DataSourceID="CategoriesData"
                ID="CategoriesRepeater"
                ItemType="NewsSystem.WebForms.Models.Category">
                <ItemTemplate>
                    <h4><%#: Item.Name %></h4>
                    <asp:ListView runat="server" ItemType="NewsSystem.WebForms.Models.Article" DataSource="<%# Item.Articles.OrderByDescending(a=>a.DateCreated).Take(3) %>" ID="ArticlesPerCategoryListView">
                        <LayoutTemplate>
                            <ul>
                                <li runat="server" id="itemPlaceholder"></li>
                            </ul>
                        </LayoutTemplate>
                        <ItemTemplate>
                            <li>
                                <asp:HyperLink NavigateUrl='<%# "~/ArticleDetails?articleId=" + Item.Id %>' runat="server" Font-Size="Medium" Text="<%#: Item.Title%>" />
                                by  <%#:Item.User.UserName  %>
                        
                            </li>
                        </ItemTemplate>
                        <EmptyDataTemplate>
                            NO ARTICLES
                        </EmptyDataTemplate>
                    </asp:ListView>
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </div>
</asp:Content>
