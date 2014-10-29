<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Articles.aspx.cs" ValidateRequest="false" Inherits="NewsSystem.WebForms.Account.Articles1" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:ObjectDataSource runat="server" ID="ArticlesDataList"
        TypeName="NewsSystem.WebForms.Services.ArticlesService"
        SelectMethod="GetAll"
        UpdateMethod="UpdateArticle"
        InsertMethod="Add"
        DeleteMethod="Delete">
        <InsertParameters>
            <asp:Parameter Name="currentUserId" Type="String" />
        </InsertParameters>
    </asp:ObjectDataSource>

    <asp:ObjectDataSource runat="server" ID="CategoriesData"
        TypeName="NewsSystem.WebForms.Services.CategoryService"
        SelectMethod="GetAll" />

    <h3>Latest Messages</h3>
    <asp:ListView runat="server"
        ID="ArticlesListViewEdit"
        DataSourceID="ArticlesDataList"
        DataKeyNames="Id"
        InsertItemPosition="LastItem">

        <LayoutTemplate>
            <asp:Button Text="Sort by Title" runat="server" ID="BtnSortByTitle" CssClass="btn btn-default" CommandName="Sort" CommandArgument="Title" />
            <asp:Button Text="Sort by Date" runat="server" ID="BtnSortByDateCreated" CssClass="btn btn-default" CommandName="Sort" CommandArgument="DateCreated" />
            <asp:Button Text="Sort by Category" runat="server" ID="BtnSortByCategoryName" CssClass="btn btn-default" CommandName="Sort" CommandArgument="CategoryName" />
            <asp:Button Text="Sort by Likes" runat="server" ID="BtnSortByLikes" CssClass="btn btn-default" CommandName="Sort" CommandArgument="LikesCount" />
            <div runat="server" id="itemPlaceholder"></div>

            <asp:DataPager ID="listViewPager" runat="server" PageSize="5">
                <Fields>
                    <asp:NextPreviousPagerField ButtonType="Link" ShowNextPageButton="false" />
                    <asp:NumericPagerField ButtonType="Link" />
                    <asp:NextPreviousPagerField ButtonType="Link" ShowPreviousPageButton="false" />
                </Fields>
            </asp:DataPager>
        </LayoutTemplate>

        <ItemTemplate>
            <div runat="server" class="row ">
                <h3>
                    
                    <a href=" <%#: "../ArticleDetails?articleId=" + Eval("Id") %>"><%#: Eval("Title") %></a>

                    <asp:Button Text="Edit" ID="EditButton" CommandName="Edit" runat="server" CssClass="btn btn-warning" />
                    <asp:Button Text="Delete" ID="DeleteButton" CommandName="Delete" runat="server" CssClass="btn btn-danger" />
                </h3>
                <p>
                    <%#: Eval("CategoryName") %>
                </p>
                <p>
                    <%#: Eval("Content").ToString().Length<300? Eval("Content"): Eval("Content").ToString().Substring(0,300).Insert(300,"...") %>
                </p>
                <p>
                    Likes Count: <%#: Eval("LikesCount") %> 
                </p>
                <p>
                    By  <%#: Eval("Author") %> Created on:  <%#: Eval("DateCreated") %>
                </p>
            </div>
        </ItemTemplate>

        <EditItemTemplate>
            <div runat="server" class="row ">
                <h3>
                    <asp:TextBox runat="server" ID="txtTitle" Text="<%# BindItem.Title %>" />

                    <asp:Button Text="Update" ID="UpdateButton" CommandName="Update" runat="server" CssClass="btn btn-primary" />
                    <asp:Button Text="Cancel" ID="CancelButton" CommandName="Cancel" runat="server" CssClass="btn btn-danger" />
                </h3>
                <p>
                    <asp:DropDownList runat="server" ID="categoriesDropDown"
                        DataSourceID="CategoriesData"
                        DataValueField="Id"
                        DataTextField="Name"
                        AppendDataBoundItems="true"
                        SelectedValue="<%# BindItem.CategoryId %>">
                    </asp:DropDownList>
                </p>
                <p>
                    <asp:TextBox runat="server" ID="txtContent" Text="<%# BindItem.Content %>" Columns="150" Rows="5" TextMode="multiline" />

                </p>
                <p>
                    By  <%#: Eval("Author") %> Created on:  <%#: Eval("DateCreated") %>
                </p>
            </div>
        </EditItemTemplate>

        <InsertItemTemplate>
            <div runat="server" class="row ">
                <h3>Title:
                    <asp:TextBox runat="server" ID="txtTitle" Text="<%# BindItem.Title %>" />
                </h3>
                <p>
                    <asp:DropDownList runat="server" ID="categoriesDropDown"
                        DataSourceID="CategoriesData"
                        DataValueField="Id"
                        DataTextField="Name"
                        AppendDataBoundItems="true"
                        SelectedValue="<%# BindItem.CategoryId %>">
                    </asp:DropDownList>
                </p>
                <p>
                    <asp:TextBox runat="server" ID="txtContent" Text="<%# BindItem.Content %>" Columns="150" Rows="5" TextMode="multiline" />
                </p>

                <asp:Button Text="Insert" ID="InsertBtn" CommandName="Insert" CssClass="btn btn-primary" runat="server" />
            </div>
        </InsertItemTemplate>

    </asp:ListView>
</asp:Content>
