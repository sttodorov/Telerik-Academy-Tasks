<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Categories.aspx.cs"  ValidateRequest="false" Inherits="NewsSystem.WebForms.Account.Categories" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:ObjectDataSource runat="server" ID="CategoriesData"
        TypeName="NewsSystem.WebForms.Services.CategoryService"
        SelectMethod="GetAllAsDataTable"
        UpdateMethod="UpdateCategory"
        InsertMethod="Add"
        DeleteMethod="Delete">
    </asp:ObjectDataSource>

    <h3>Categories</h3>
    <asp:ListView runat="server"
        ID="CategoriesListView"
        DataSourceID="CategoriesData"
        DataKeyNames="Id"
        InsertItemPosition="LastItem">

        <LayoutTemplate>
            <asp:Button Text="Sort by Category" runat="server" ID="BtnSortByCategoryName" CssClass="btn btn-default" CommandName="Sort" CommandArgument="Name" />
            <div runat="server" id="itemPlaceholder"></div>

            <asp:DataPager ID="listViewPager" runat="server" PageSize="5">
                <Fields>
                    <asp:NextPreviousPagerField ButtonType="Link" ShowNextPageButton="false" />
                    <asp:NumericPagerField  ButtonType="Link"  />
                    <asp:NextPreviousPagerField ButtonType="Link" ShowPreviousPageButton="false" />
                </Fields>
            </asp:DataPager>
        </LayoutTemplate>

        <ItemTemplate>
            <div runat="server" class="row ">
                <span class="col-lg-4">
                    <%#: Eval("Name") %>
                </span>
                <span class="col-lg-4">
                    <asp:Button Text="Edit" ID="EditButton" CommandName="Edit" runat="server" CssClass="btn btn-warning" />
                    <asp:Button Text="Delete" ID="DeleteButton" CommandName="Delete" runat="server" CssClass="btn btn-danger"  />
                </span>
            </div>
        </ItemTemplate>

        <EditItemTemplate>
            <div runat="server" class="row ">
                <span class="col-lg-4">
                      <asp:TextBox runat="server" ID="txtName" Text="<%# BindItem.Name %>" />
                </span>
                <span class="col-lg-4">
                    <asp:Button Text="Update" ID="UpdateButton" CommandName="Update" runat="server" CssClass="btn btn-primary" />
                    <asp:Button Text="Cancel" ID="CancelButton" CommandName="Cancel" runat="server" CssClass="btn btn-danger"  />
                </span>
            </div>
        </EditItemTemplate>

        <InsertItemTemplate>
            <div runat="server" class="row ">
                <span class="col-lg-4">
                      <asp:TextBox runat="server" ID="txtName" Text="<%# BindItem.Name %>" />
                </span>
                <span class="col-lg-4">
                    <asp:Button Text="Insert" ID="InsertButton" CommandName="Insert" runat="server" CssClass="btn btn-primary" />
                </span>
            </div>
        </InsertItemTemplate>

    </asp:ListView>
</asp:Content>
